import { MILLISECONDS_IN_A_MONTH } from "../dateToMilliseconds";

export default function advanceOneMonth(zoomState, setZoomState, maxDomain) {
  if (!zoomState) {
    throw new Error("No zoomState provided");
  }

  if (!setZoomState) {
    throw new Error("No setZoomState provided");
  }

  if (!maxDomain || typeof maxDomain !== "number") {
    throw new Error("No maxDomain provided");
  }

  if (typeof zoomState.x[0] === "number") {
    const left_prevUnixTime = zoomState.x[0];
    const left_nextUnixTime = left_prevUnixTime + MILLISECONDS_IN_A_MONTH;
    const left_newDate = new Date(left_nextUnixTime);

    const right_prevUnixTime = zoomState.x[1];
    const right_nextUnixTime = right_prevUnixTime + MILLISECONDS_IN_A_MONTH;
    const right_newDate = new Date(right_nextUnixTime);

    if (right_nextUnixTime > maxDomain) {
      return;
    }

    const newDomain = {
      x: [left_newDate, right_newDate],
    };

    setZoomState({ x: newDomain.x, y: zoomState.y });
  } else {
    const left_prevUnixTime = zoomState.x[0].getTime();
    const left_nextUnixTime = left_prevUnixTime + MILLISECONDS_IN_A_MONTH;
    const left_newDate = new Date(left_nextUnixTime);

    const right_prevUnixTime = zoomState.x[1].getTime();
    const right_nextUnixTime = right_prevUnixTime + MILLISECONDS_IN_A_MONTH;
    const right_newDate = new Date(right_nextUnixTime);

    if (right_nextUnixTime > maxDomain) {
      return;
    }

    const newDomain = {
      x: [left_newDate, right_newDate],
    };

    setZoomState({ x: newDomain.x, y: zoomState.y });
  }
}
