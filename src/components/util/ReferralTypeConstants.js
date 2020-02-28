export type ReferralTypeEnum = "EMAIL_ADDRESS" | "PHONE_NUM";

export type ReferralType = $<{|
    EMAIL_ADDRESS: string,
    PHONE_NUM: number
|}>;

const ReferralTypeConstants: ReferralType = Object.freeze({
    EMAIL_ADDRESS: "john_doe@gmail.com",
    PHONE_NUM: "(765)777-7777"
});

const ReferralMedium = Object.freeze({
    EMAIL: "EMAIL",
    TEXT: "TEXT"
});

export { ReferralTypeConstants, ReferralMedium };
