import React from "react";
import { POPUPS } from "../../const";
import { useQueryParameter } from "../../hooks";
import Room from "../room";

const popups = {
  [POPUPS.ROOM]: Room,
};

const PopupsManager = () => {

  const popupsString = useQueryParameter("popups");
  let popupsArray;

  if (popupsString) {
    popupsArray = JSON.parse(popupsString);
  }

  if (!popupsArray?.length) {
    return null;
  }

  return (
    <>
      {popupsArray.map((mountedPopup: CommonPopupType) => {
        const Component = popups[mountedPopup.name];
        return <Component key={mountedPopup.name} {...mountedPopup} />;
      })}
    </>
  );
};

export default React.memo(PopupsManager);

// types
type RequiredPopupType = {
  name: PopupsNameType
};

type OptionalPopupType = {
  [key: string]: any
};

type CommonPopupType = RequiredPopupType & OptionalPopupType;

type PopupsNameType = keyof typeof popups;
