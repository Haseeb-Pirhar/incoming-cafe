import { Flex } from '@radix-ui/themes'
import { cn } from '@/utils'

interface FormFieldContainerProps {
  className?: string
}

const FormFieldContainer = ({
  children,
  className,
}: React.PropsWithChildren<FormFieldContainerProps>) => (
  <Flex direction="column" className={cn('gap-[2px]', className)}>
    {children}
  </Flex>
)

export { FormFieldContainer }
