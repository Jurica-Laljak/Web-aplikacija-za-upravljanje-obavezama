import {
  PrefixFilterDto,
  PriorityFilterDto,
  SizeFilterDto,
  TimePeriodFilterDto,
} from "../../../shared/filter/Filter.dto";

export function assertIsSizeFilter(
  value: unknown
): asserts value is SizeFilterDto {}

// export function assertIsSizeFilterArray(
//   value: unknown[]
// ): asserts value is SizeFilterDto[] {}

export function assertIsTimeperiodFilter(
  value: unknown
): asserts value is TimePeriodFilterDto {}

// export function assertIsTimeperiodFilterArray(
//   value: unknown[]
// ): asserts value is TimePeriodFilterDto[] {}

export function assertIsPriorityFilter(
  value: unknown
): asserts value is PriorityFilterDto {}

// export function assertIsPriorityFilterArray(
//   value: unknown[]
// ): asserts value is PriorityFilterDto[] {}

export function assertIsPrefixFilter(
  value: unknown
): asserts value is PrefixFilterDto {}

// export function assertIsPrefixFilterArray(
//   value: unknown[]
// ): asserts value is PrefixFilterDto[] {}
