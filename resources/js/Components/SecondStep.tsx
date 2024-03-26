import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { IoIosArrowBack } from "react-icons/io";
import Label from "../Components/Label";
import Button from "../Components/Button";
import styles from "../../css/secondStep.module.css";
import { toast } from "react-toastify";

// Типизация для props компонента, если нужно
type SecondStepProps = {
  setSteps: (step: number) => void;
};

// Схема валидации Yup
const schema = Yup.object().shape({
  confirmEmail: Yup.string().required("Пожалуйста, введите код"),
});

const SecondStep: React.FC<SecondStepProps> = ({ setSteps }) => {
  const [error, setError] = useState(false);
  const { user } = useSelector((state: any) => state?.user); // Используем useSelector для доступа к состоянию пользователя

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const submitForm = (values: any) => {
    // Проверяем, соответствует ли введённый код коду верификации
    if (user && user.verification_code === values.confirmEmail) {
      setSteps(3);
      toast.success("Email был подтвержден!");
    } else {
      setError(true);
      toast.error("Код написан неправильно");
    }
  };

  // Условие, если пользователь не загружен, можно обработать отдельно
  if (!user) {
    return <div>Загрузка пользователя...</div>; // Или другая логика обработки
  }

  return (
    <form className={styles.secondStep} onSubmit={handleSubmit(submitForm)}>
      <div className="form_title">
        <div className="standard_back" onClick={() => setSteps(1)}>
          <div className="back">
            <IoIosArrowBack />
          </div>
          <h4>Вернуться назад</h4>
        </div>
        <h2>Подтверждение почтового ящика</h2>
      </div>
      <Label
        title="Введите код отправленный на email@wallone.ru"
        placeholder="007JDy"
        type="text"
        name="confirmEmail"
        register={register("confirmEmail")}
        errorMsg={errors.confirmEmail?.message}
      />
      {error && <span className={styles.error}>Код написан неправильно</span>}
      <div className={styles.actions}>
        <Button text="Подтвердить" />
      </div>
    </form>
  );
};

export default SecondStep;
