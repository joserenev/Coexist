// @flow
// @format

export type QueryStatusEnum = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export type QueryStatusType = $<{|
    IDLE: string,
    PENDING: string,
    SUCCESS: string,
    ERROR: string
|}>;

const QueryStatus: QueryStatusType = Object.freeze({
    IDLE: "IDLE",
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
});

export type MutationStatusEnum = "IDLE" | "PENDING" | "SUCCESS" | "ERROR";

export type MutationStatusType = $<{|
    IDLE: string,
    PENDING: string,
    SUCCESS: string,
    ERROR: string
|}>;

const MutationStatus: QueryStatusType = Object.freeze({
    IDLE: "IDLE",
    PENDING: "PENDING",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR"
});

export { QueryStatus, MutationStatus };
