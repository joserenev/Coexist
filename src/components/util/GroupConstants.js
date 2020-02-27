// @flow
export type GroupTypeEnum = "HOUSEMATES" | "WORK" | "SOCIAL" | "OTHER";

export type GroupType = $<{|
    HOUSEMATES: string,
    WORK: string,
    SOCIAL: string,
    OTHER: string
|}>;

const GroupTypeConstants: GroupType = Object.freeze({
    HOUSEMATES: "HOUSEMATES",
    WORK: "WORK",
    SOCIAL: "SOCIAL",
    OTHER: "OTHER"
});

export { GroupTypeConstants };
