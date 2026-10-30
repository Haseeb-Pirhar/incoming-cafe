#!/bin/bash

# Load environment variables from .env file in the project root
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
elif [ -f "../.env" ]; then
    export $(cat ../.env | grep -v '^#' | xargs)
fi

# Set default values for environment variables
PROJECT_NAME=${PROJECT_NAME:-"Bakra Bazaar"}
MODE=${MODE:-"web-stag"}

# Set the working directory
WORKING_DIR="/var/${PROJECT_NAME}/${PROJECT_NAME}-${MODE}"

# Log the configuration
echo "[$(date)] Configuration: PROJECT_NAME=$PROJECT_NAME, MODE=$MODE"
echo "[$(date)] Working directory: $WORKING_DIR"

# Check if the working directory exists
if [ ! -d "$WORKING_DIR" ]; then
    echo "[$(date)] ERROR: Working directory $WORKING_DIR does not exist"
    echo "[$(date)] Available directories in /var:"
    ls -la /var/ 2>/dev/null || echo "Cannot list /var directory"
    exit 1
fi

# Change to the working directory
cd "$WORKING_DIR" || {
    echo "[$(date)] ERROR: Failed to change to directory $WORKING_DIR"
    exit 1
}

# Get the current branch name
CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD 2>/dev/null)
if [ $? -ne 0 ] || [ -z "$CURRENT_BRANCH" ]; then
    echo "[$(date)] ERROR: Not a git repository or failed to get current branch"
    exit 1
fi

# Log the start of the process
echo "[$(date)] Starting update check for branch: $CURRENT_BRANCH in $(pwd)..."

# Stash all local changes
echo "[$(date)] Stashing local changes..."
git stash push -m "Auto-stash before pull on $(date)" || {
    echo "[$(date)] Warning: No local changes to stash or stash failed"
}

# Fetch all changes from remote
echo "[$(date)] Fetching changes from remote..."
git fetch origin

# Get the current and remote commit hashes for current branch
LOCAL=$(git rev-parse HEAD 2>/dev/null)
REMOTE=$(git rev-parse "origin/$CURRENT_BRANCH" 2>/dev/null)

if [ $? -ne 0 ]; then
    echo "[$(date)] ERROR: Failed to get commit hashes. Check if branch $CURRENT_BRANCH exists on remote."
    exit 1
fi

# Check if there are any changes
if [ "$LOCAL" = "$REMOTE" ]; then
    echo "[$(date)] No changes detected in branch $CURRENT_BRANCH. Skipping update."
    exit 0
fi

echo "[$(date)] Changes detected in branch $CURRENT_BRANCH. Starting update process..."

# Pull the changes from current branch
echo "[$(date)] Pulling changes from origin/$CURRENT_BRANCH..."
git pull origin "$CURRENT_BRANCH"

# Check if .next folder exists (assumes it was pushed to git)
if [ ! -d ".next" ]; then
    echo "[$(date)] ⚠️  WARNING: .next folder not found after pull!"
    echo "[$(date)] This script expects .next folder to be pushed to the repository."
    echo "[$(date)] If you need to build on server, uncomment the build section below."
    # Uncomment the following lines if you need to build on server as fallback:
    # echo "[$(date)] Installing dependencies..."
    # yarn install
    # echo "[$(date)] Building application..."
    # yarn build
    exit 1
fi

echo "[$(date)] ✅ .next folder found, using pre-built version from repository"

# Ensure standalone directory exists
if [ ! -d ".next/standalone" ]; then
    echo "[$(date)] ⚠️  WARNING: .next/standalone folder not found!"
    echo "[$(date)] Standalone build is required. Make sure to build with 'output: standalone' in next.config.ts"
    exit 1
fi

# Copy static files to standalone (required for images and static assets)
if [ -d ".next/static" ]; then
    echo "[$(date)] Copying static files to standalone build..."
    
    # Create .next directory in standalone if it doesn't exist
    mkdir -p ".next/standalone/.next"
    
    # Remove existing static directory in standalone to ensure clean copy
    if [ -d ".next/standalone/.next/static" ]; then
        echo "[$(date)] Removing existing static directory in standalone..."
        rm -rf ".next/standalone/.next/static"
    fi
    
    echo "[$(date)] Copying .next/static to .next/standalone/.next/static..."
    cp -r ".next/static" ".next/standalone/.next/static" && {
        echo "[$(date)] ✅ Successfully copied static files to standalone build"
    } || {
        echo "[$(date)] ⚠️  Warning: Failed to copy static files, but continuing..."
    }
else
    echo "[$(date)] ⚠️  WARNING: .next/static directory not found!"
    echo "[$(date)] Static files are required for the application to work correctly."
fi

# Restart the application
echo "[$(date)] Restarting application..."
pm2 restart "${PROJECT_NAME}-${MODE}"

echo "[$(date)] Update completed successfully for branch $CURRENT_BRANCH."
