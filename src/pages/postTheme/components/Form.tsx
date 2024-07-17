import * as React from "react";
import { useEffect, useState } from "react";
import useSubmitData from "../hooks/useSubmitData";
import { FormProps } from "../constants/propTypes";
import { CreateButton } from "../UI/CreateButton";

const Form: React.FC<FormProps> = ({
  children,
  handleChange,
  themeData,
  setThemeData,
}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const { handleSubmit, isSubmitting } = useSubmitData(themeData);

  // 이름 유효성 검사
  const validateForm = () => {
    if (themeData.name && themeData.name.trim() !== "") {
      return true;
    }
    return false;
  };

  // 데이터 값이 변경될 때마다 유효성 검사
  useEffect(() => {
    const isValid = validateForm();
    setIsDisabled(!isValid);
  }, [themeData]);

  // 버튼 클릭 시 폼 제출
  const onButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    handleSubmit(e as unknown as React.FormEvent);
  };

  return (
    <form className="flex flex-col grow items-center mt-32 m-auto gap-12 max-w-3xl max-[1248px]:mx-6">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const childProps = {
            handleChange,
            themeData,
            setThemeData,
            setIsDisabled,
          };
          return React.cloneElement(child, childProps);
        }
        return child;
      })}
      <CreateButton
        onButtonClick={onButtonClick}
        isDisabled={isDisabled}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};

export default Form;
