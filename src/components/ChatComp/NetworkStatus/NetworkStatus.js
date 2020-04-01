import React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../storePubnub/storeTypes";
import { PresenceIndicatorIcon } from "../NetworkStatus/PresenceIndicatorIcon";
import { Wrapper } from "../NetworkStatus/NerworkStatus.style";

const NetworkStatus = () => {
  let isConnected: boolean = useSelector(
    (state: AppState) => state.networkStatus.isConnected
  );
  return (
    <Wrapper>
      <PresenceIndicatorIcon
        title={isConnected ? "connected" : "not connected"}
        active={isConnected}
      />
    </Wrapper>
  );
};

export { NetworkStatus };
