export enum LoadingStatus {
    IDLE,
    LOADING,
    SUCCEEDED,
    FAILED
}

export interface InitialReducerState<T> {
    status: LoadingStatus;
    entities: T[]
}