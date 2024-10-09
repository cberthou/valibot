import type { BaseTransformation, SuccessDataset } from '../../types/index.ts';
import type {ArrayInput, ArrayRequirement, ArrayRequirementPredicate} from '../types.ts';

/**
 * Find item action type when used with type predicate
 */
export interface FindItemActionPredicate<TInput extends ArrayInput, TOutput extends TInput[number]>
    extends BaseTransformation<TInput, TOutput | undefined, never> {
  /**
   * The action type.
   */
  readonly type: 'find_item';
  /**
   * The action reference.
   */
  readonly reference: typeof findItem;
  /**
   * The find item operation.
   */
  readonly operation: ArrayRequirementPredicate<TInput, TOutput>;
}

/**
 * Find item action type.
 */
export interface FindItemAction<TInput extends ArrayInput>
  extends BaseTransformation<TInput, TInput[number] | undefined, never> {
  /**
   * The action type.
   */
  readonly type: 'find_item';
  /**
   * The action reference.
   */
  readonly reference: typeof findItem;
  /**
   * The find item operation.
   */
  readonly operation: ArrayRequirement<TInput>;
}

/**
 * Creates a find item transformation action.
 *
 * @param operation The find item operation.
 *
 * @returns A find item action.
 */
export function findItem<TInput extends ArrayInput, TOuput extends TInput[number]>(
    operation: ArrayRequirementPredicate<TInput, TOuput>
): FindItemActionPredicate<TInput, TOuput>;

export function findItem<TInput extends ArrayInput>(
  operation: ArrayRequirement<TInput>
): FindItemAction<TInput>;

export function findItem(
  operation: ArrayRequirement<unknown[]>
): FindItemAction<unknown[]> {
  return {
    kind: 'transformation',
    type: 'find_item',
    reference: findItem,
    async: false,
    operation,
    '~validate'(dataset) {
      // @ts-expect-error
      dataset.value = dataset.value.find(this.operation);
      return dataset as SuccessDataset<unknown | undefined>;
    },
  };
}
