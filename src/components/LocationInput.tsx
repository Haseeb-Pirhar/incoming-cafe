"use client";

import React, { useEffect, useState, useCallback, useRef } from "react";
import { useFormContext } from "react-hook-form";
import { GoolgePlaceType } from "@/types/google";
import { googleAPI } from "@/api/api-call/google-api";
import { TextField, Text, Flex } from "@radix-ui/themes";

interface LocationInputProps {
  label?: string;
  field: string;
  placeholder?: string;
  selectedPlace?: GoolgePlaceType | null;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({
  label = "Location",
  field,
  placeholder = "Search for a location...",
  selectedPlace,
  className,
}) => {
  const form = useFormContext();
  const containerRef = useRef<HTMLDivElement>(null); // Add this ref
  const [searchText, setSearchText] = useState(
    selectedPlace?.formatted_address || "",
  );
  const [places, setPlaces] = useState<GoolgePlaceType[]>([]);
  const [debouncedValue, setDebouncedValue] = useState(searchText);

  // Debounce effect
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchText);
    }, 400); // 400ms debounce

    return () => clearTimeout(handler);
  }, [searchText]);

  // Fetch places when debounced value changes
  useEffect(() => {
    const fetchPlaces = async () => {
      if (debouncedValue.length < 3) {
        setPlaces([]);
        return;
      }
      try {
        const res = await googleAPI.getPlaces(debouncedValue);
        if (res?.results) {
          setPlaces(res.results);
        }
      } catch (error) {
        console.error("Error fetching places:", error);
      }
    };

    fetchPlaces();
  }, [debouncedValue]);

  // Handle selection
  const handlePlaceSelect = useCallback(
    async (place: GoolgePlaceType) => {
      setSearchText(place.formatted_address);
      setPlaces([]);

      const placeInfo = await googleAPI.getPlaceDetails(place.place_id);
      if (!placeInfo) return;

      // Update form values
      form.setValue(field, {
        latitude: placeInfo.geometry.location.lat,
        longitude: placeInfo.geometry.location.lng,
      });
      form.setValue("address", placeInfo.formatted_address);
      form.setValue("city", placeInfo.transformedAddress?.locality?.long_name);
      form.setValue(
        "state",
        placeInfo.transformedAddress?.administrative_area_level_1?.long_name,
      );
      form.setValue(
        "country",
        placeInfo.transformedAddress?.country?.long_name,
      );
      form.setValue(
        "zip",
        placeInfo.transformedAddress?.postal_code?.long_name,
      );
    },
    [field, form],
  );

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setPlaces([]);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-full" ref={containerRef}>
      {label && (
        <Text className=" text-sm font-medium text-gray-900 ">{label}</Text>
      )}

      <Flex direction="column" className="relative w-full mt-1!">
        <TextField.Root
          type="search"
          size="3"
          value={form.watch("address") ?? form.watch("city") ?? searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            form.setValue("address", e.target.value);
          }}
          placeholder={placeholder}
        />
        {searchText === ""}

        {/* Suggestions Dropdown */}
        {places.length > 0 && (
          <ul className="absolute top-9 z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-48 overflow-y-auto">
            {places.map((place) => (
              <li
                key={place.place_id}
                className="px-3 py-2 cursor-pointer hover:bg-gray-100 text-sm"
                onClick={() => handlePlaceSelect(place)}
              >
                {place.formatted_address}
              </li>
            ))}
          </ul>
        )}
      </Flex>
    </div>
  );
};

export default LocationInput;
