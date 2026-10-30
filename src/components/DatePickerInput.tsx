'use client'

import { CalendarDate } from '@internationalized/date'
import { Flex, Text } from '@radix-ui/themes'
import {
  Calendar as CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import {
  Button,
  Calendar,
  CalendarCell,
  CalendarGrid,
  DateInput,
  DatePicker,
  DatePickerProps,
  DateSegment,
  DateValue,
  Dialog,
  Group,
  Heading,
  Popover,
} from 'react-aria-components'
import { Controller, useFormContext } from 'react-hook-form'

interface DatePickerInputProps<T extends DateValue> extends DatePickerProps<T> {
  label?: string
  field: string
  isRequired?: boolean
  aria_lable?: string
  isDisabled?: boolean
  className?: string
  datePickerClass?: string
  dateInputClass?: string
  handleChange?: (date: CalendarDate) => void
  showError?: boolean
}

const DatePickerInput = <T extends DateValue>({
  label,
  isRequired,
  field,
  aria_lable,
  isDisabled,
  className,
  datePickerClass,
  dateInputClass,
  handleChange,
  showError = true,
  ...props
}: DatePickerInputProps<T>) => {
  const form = useFormContext()

  return (
    <div>
      <Flex>
        {label && (
          <Text
            as="label"
            weight="medium"
            className="text-sm text-gray-900 mb-1"
          >
            {label}
          </Text>
        )}
      </Flex>
      <Controller
        control={form.control}
        name={field}
        rules={isRequired ? { required: 'Required' } : undefined}
        render={({
          field: { name, value, onChange, onBlur },
          fieldState: { invalid },
        }) => (
          <DatePicker
            name={name}
            value={value ?? null} // Ensure it handles null or undefined
            onChange={(date) => {
              onChange(date)
              handleChange?.(date as CalendarDate)
            }}
            onBlur={onBlur}
            isRequired
            validationBehavior="aria"
            aria-label={aria_lable ?? 'date to filter input'}
            isInvalid={invalid}
            className={datePickerClass}
            isDisabled={
              form.formState.disabled ||
              form.formState.isSubmitting ||
              isDisabled
            }
            {...props}
          >
            <Group
              className={
                'relative w-full data-[disabled]:pointer-events-none data-[disabled]:bg-gray-3 data-[disabled]:text-gray-11'
              }
            >
              <Flex
                p="2"
                className="border border-gray-300 rounded-md overflow-hidden"
              >
                <DateInput className={`w-full flex ${className}`}>
                  {(segment) => <DateSegment segment={segment} />}
                </DateInput>
              </Flex>
              <Button
                className={
                  'bg-white absolute bottom-[1px] right-[4px] top-[1px] flex items-center rounded-1 pr-[3px] outline-none disabled:bg-gray-3 disabled:text-gray-11'
                }
              >
                <CalendarIcon size={16} className="stroke-pp-gray-3" />
              </Button>
            </Group>
            <Popover className="bg-white pointer-events-auto rounded-1 p-3 shadow-[0px_7px_29px_rgba(100,100,111,0.2)]">
              <Dialog>
                <Calendar>
                  <Flex justify="between" mb="1" mx="2">
                    <Button
                      slot="previous"
                      className={
                        'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid border-slate-6 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6'
                      }
                    >
                      <ChevronLeftIcon className="h-4 w-4" />
                    </Button>
                    <Heading className="flex-1 text-center text-[14px] font-medium" />
                    <Button
                      slot="next"
                      className={
                        'text-base hover:text-black m-0 flex h-[1.5em] w-[1.5em] items-center justify-center rounded-1 border border-solid border-slate-6 text-slate-10 hover:border-slate-12 data-[disabled]:cursor-not-allowed data-[disabled]:border-gray-3 data-[disabled]:text-gray-6'
                      }
                    >
                      <ChevronRightIcon className="h-4 w-4" />
                    </Button>
                  </Flex>
                  <CalendarGrid className="[&__.react-aria-CalendarHeaderCell]:text-[13px] [&__.react-aria-CalendarHeaderCell]:font-medium">
                    {(date) => (
                      <CalendarCell
                        date={date}
                        className={
                          'data-[selected]:text-white hover:text-white hover:bg-black data-[selected]:bg-black [&[aria-label*="Today"]]:bg-pp-focus-bg data-[outside-month]:opacity-35 m-px w-[2em] cursor-pointer rounded-[6px] text-center text-[13px] leading-[2em] outline-none hover:!bg-iris-6 data-[disabled]:cursor-not-allowed data-[outside-month]:!cursor-default data-[disabled]:!bg-transparent data-[outside-month]:!bg-transparent data-[selected]:!bg-iris-12 data-[disabled]:text-gray-6'
                        }
                      />
                    )}
                  </CalendarGrid>
                </Calendar>
              </Dialog>
            </Popover>
          </DatePicker>
        )}
      />
    </div>
  )
}

export { DatePickerInput }
