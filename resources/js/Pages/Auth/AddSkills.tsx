import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Inertia } from "@inertiajs/inertia";
import ChecksItem from "../../Components/ChecksItem";
import { IoIosArrowBack } from "react-icons/io";
import Button from "../../Components/Button";
import styles from "../../../css/fourdStep.module.css";
import Loading from "../../Components/Loading";
import { toast } from "react-toastify";
import RegisterLayout from "../../Layouts/RegisterLayout";
import { router } from "@inertiajs/react";

type AddSkillsProps = {
    title: string;
    page: any;
};
const AddSkills: React.FC<AddSkillsProps> = ({ title, page }) => {
    const dispatch = useDispatch();
    const [skillsArr, setSkillsArr] = useState([]);
    const [error, setError] = useState(false);
    useEffect(() => {
        if (page.redirectData.find_from) {
            toast.success("Выберите минимум 2 пункта");
        }
    }, []);
    const checkItems = () => {
        if (!skillsArr.length || skillsArr.length < 2) {
            setError(true);
        } else {
            const body = {
                user_id: page.redirectData.id,
                skill_ids: skillsArr,
            };
            router.post("/steps/2", body);
        }
    };

    return (
        <div className={styles.fourdStep}>
            <div className="form_title">
                <IoIosArrowBack className="standard_back" />
                <h2>Творческие навыки</h2>
                <p>Выбери несколько пунктов</p>
            </div>
            <div className={styles.socialsContainer}>
                <div className={styles.socials}>
                    {page.skillsData.map((skill: any) => (
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

export default RegisterLayout(AddSkills);
