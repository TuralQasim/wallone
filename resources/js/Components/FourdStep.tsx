import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Inertia } from "@inertiajs/inertia";
import ChecksItem from "../Components/ChecksItem";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../Components/Button";
import styles from "../../css/fourdStep.module.css";
import Loading from "../Components/Loading";
import { toast } from "react-toastify";

type stepType = {
  setSteps: any;
};
const FourdStep: React.FC<stepType> = ({ setSteps }) => {
  const dispatch = useDispatch();
  const { user, loading, skills } = useSelector((state: any) => state.user);
  const [skillsArr, setSkillsArr] = useState([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    dispatch({ type: "LOADING", payload: true });
    Inertia.get(
      "/skills",
      {},
      {
        onSuccess: ({ props }) => {
          dispatch({ type: "SKILLS", payload: props.skills });
          dispatch({ type: "LOADING", payload: false });
        },
        onError: () => {
          toast.error("Ошибка загрузки данных о навыках.");
          dispatch({ type: "LOADING", payload: false });
        },
      }
    );
  }, [dispatch]);

  const checkItems = () => {
    if (!skillsArr.length || skillsArr.length < 2) {
      setError(true);
    } else {
      dispatch({ type: "LOADING", payload: true });
      Inertia.post(
        "/register/add-skills",
        {
          user_id: user.id,
          skill_ids: skillsArr,
        },
        {
          onFinish: () => dispatch({ type: "LOADING", payload: false }),
          onSuccess: () => {
            toast.success("Навыки были добавлены");
            setSteps(5);
          },
          onError: () => {
            toast.error("Навыки не добавились");
            setSteps(4);
          },
        }
      );
    }
  };

  if (loading) return <Loading />;

  return (
    <div className={styles.fourdStep}>
      <div className="form_title">
        <IoIosArrowBack onClick={() => setSteps(3)} className="standard_back" />
        <h2>Творческие навыки</h2>
        <p>Выбери несколько пунктов</p>
      </div>
      <div className={styles.socialsContainer}>
        <div className={styles.socials}>
          {skills.map((skill: any) => (
            <ChecksItem
              key={skill.id}
              setSkillsArr={setSkillsArr}
              title={skill.title_ru}
              skillsArr={skillsArr}
              id={skill.id}
            />
          ))}
        </div>
      </div>
      {error && (
        <span className="error_message">Выбери минимум два пункта</span>
      )}
      <div className={styles.actions}>
        <Button onClick={checkItems} text="Далее" />
      </div>
    </div>
  );
};

export default FourdStep;
