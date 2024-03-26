import React from "react";
import styles from "../../css/checksItem.module.css";
import * as Icons from "react-icons";
import {
  FaTelegramPlane,
  FaYoutube,
  FaTwitter,
  FaFacebook,
  FaInstagram,
} from "react-icons/fa";
import { SlSocialVkontakte } from "react-icons/sl";
import { IoLogoDiscord } from "react-icons/io5";
import { HiOutlineSpeakerphone } from "react-icons/hi";

type ChecksItemProps = {
  icon?: string | null;
  title: string;
  setItems?: any;
  items?: string;
  setSkillsArr?: (arg: any) => void;
  skillsArr?: number[];
  id?: number;
};
const ChecksItem: React.FC<ChecksItemProps> = ({
  icon,
  title,
  setItems,
  items,
  skillsArr,
  setSkillsArr,
  id,
}) => {
  let IconComponent: Icons.IconType | null = null;
  switch (icon) {
    case "FaTelegramPlane":
      IconComponent = FaTelegramPlane;
      break;
    case "FaYoutube":
      IconComponent = FaYoutube;
      break;
    case "SlSocialVkontakte":
      IconComponent = SlSocialVkontakte;
      break;
    case "IoLogoDiscord":
      IconComponent = IoLogoDiscord;
      break;
    case "FaTwitter":
      IconComponent = FaTwitter;
      break;
    case "FaFacebook":
      IconComponent = FaFacebook;
      break;
    case "FaInstagram":
      IconComponent = FaInstagram;
      break;
    case "HiOutlineSpeakerphone":
      IconComponent = HiOutlineSpeakerphone;
      break;
    default:
      IconComponent = null;
  }

  return (
    <>
      {skillsArr && id && setSkillsArr && (
        <div
          className={`${styles.checksItem} ${
            skillsArr.includes(id) ? styles.checksItemActive : ""
          }`}
          onClick={() => {
            if (skillsArr.includes(id)) {
              setSkillsArr((items: number[]) => [
                ...items.filter((a) => a != id),
              ]);
            } else {
              setSkillsArr((items: number[]) => [...items, id]);
            }
          }}
        >
          {IconComponent && <IconComponent />}
          <h5>{title}</h5>
        </div>
      )}
      {setItems && (
        <div
          className={`${styles.checksItem} ${
            items === title ? styles.checksItemActive : ""
          }`}
          onClick={() => setItems(title)}
        >
          {IconComponent && <IconComponent />}
          <h5>{title}</h5>
        </div>
      )}
    </>
  );
};

export default ChecksItem;
