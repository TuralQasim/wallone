import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../Components/Button";
import ChecksItem from "../Components/ChecksItem";
import styles from "../../css/thirdStep.module.css";
import { Inertia } from "@inertiajs/inertia";
import { toast } from "react-toastify";

// Обновление состояний Redux
const setLoading = (isLoading: boolean) => ({
  type: "LOADING",
  payload: isLoading,
});

const schema = Yup.object().shape({
  selectedOption: Yup.string().required("Выберите минимум один пункт"),
});

type ThirdStepProps = {
  setSteps: (step: number) => void;
};
const ThirdStep: React.FC<ThirdStepProps> = ({ setSteps }) => {
  const itemArr = [
    {
      title: "Telegram",
      icon: "FaTelegramPlane",
    },
    {
      title: "Youtube",
      icon: "FaYoutube",
    },
    {
      title: "VK",
      icon: "SlSocialVkontakte",
    },
    {
      title: "Discord",
      icon: "IoLogoDiscord",
    },
    {
      title: "Twitter",
      icon: "FaTwitter",
    },
    {
      title: "Facebook",
      icon: "FaFacebook",
    },
    {
      title: "Instagram",
      icon: "FaInstagram",
    },
    {
      title: "Другие",
      icon: "HiOutlineSpeakerphone",
    },
  ];
  const [items, setItems] = useState("");
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    if (items) {
      setError(true);
      return;
    }
    dispatch(setLoading(true));

    Inertia.post("/register/find-from", data, {
      onFinish: () => dispatch(setLoading(false)), // Устанавливаем loading в false при завершении запроса
      onSuccess: () => {
        toast.success("Успешно!");
        setSteps(4);
      },
      onError: () => {
        toast.error("Ошибка отправки данных.");
      },
    });
  };

  return (
    <form className={styles.thirdStep} onSubmit={handleSubmit(onSubmit)}>
      <div className="form_title">
        <IoIosArrowBack onClick={() => setSteps(2)} className="standard_back" />
        <h2>Как вы о нас узнали?</h2>
      </div>
      {itemArr.map((item) => (
        <ChecksItem
          key={item.icon}
          icon={item.icon}
          title={item.title}
          setItems={setItems}
          items={items}
        />
      ))}
      {error && <p className="error_message">Выбери минимум один пункт</p>}
      <Button onClick={onSubmit} text="Далее" />
    </form>
  );
};

export default ThirdStep;
