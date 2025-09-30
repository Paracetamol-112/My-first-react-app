import React, { FormEvent, useRef, useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  name: z.string().min(3, { message: "Name must be at least 3 characters." }),
  age: z
    .number({ invalid_type_error: "Age field is required." })
    .min(18, { message: "Age must be at least 18." }),
});

// If zod is used in above that the following interface FormData can be replace by a type object
// then we need to install another package @hookform/resolvers@2.9.11 to use the resolver in react
// hook form.

// interface FormData {
//   name: string;
//   age: number;
// }

type FormData = z.infer<typeof schema>;

const Form = () => {
  // Type div.mb-3>label.form-label+input[type=number].form-control
  // we will then get the second div markup.
  // Type button.btn.btn-primary we will get the third button markup
  // the "type" property and the Submit text need to input manually

  //We should always initialize our ref objects with null.
  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const person = { name: "", age: 0 };

  // Once we submit an HTML form, that form is posted to the server
  // we will then get a full page reload that's why we need preventDefault to prevent
  // the form being posted to the server.

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (nameRef.current !== null) person.name = nameRef.current.value;
    if (ageRef.current !== null) person.age = parseInt(ageRef.current.value);
    console.log(person);
  };

  // Get the value of input field in form by using state hook.
  const [person2, setPerson] = useState({
    name: "",
    age: 0,
  });

  // If use state hook then change the input HTML markup as follow
  // <input onChange={(event) => setPerson({ ...person2, name: event.target.value })}
  // value={person2.name}
  // id="name"
  // type="text"
  // className="form-control" />
  //
  // For age input field do the similar thing
  // <input onChange={(event) => setPerson({ ...person2, age: parseInt(event.target.value) })}
  // value={person2.age}
  // id="age"
  // type="number"
  // className="form-control" />
  //
  // After changing this the handleSubmit also need to change
  //   const handleSubmit = (event: FormEvent) => {
  //     event.preventDefault();
  //     console.log(person2);
  //   };
  //
  //
  //
  //
  //
  //
  //
  // As our forms get more complex, managing the form state with state hook can become time consuming
  // and error prone. We then can use a react library called react hook form with this library we can
  // build forms with less code. The following is the way to do it with value validation. If library
  // zod is used then we no longer need to declare an restriction object in
  // { ...register("name", restriction object)} and the error message paragraph can be replaced by
  // {errors.name && (
  //   <p className="text-danger">{errors.name.message}</p>
  //  )}
  // and
  // {errors.age && (
  //   <p className="text-danger">{errors.age.message}</p>
  // )}
  //
  //
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors, isValid },
  // } = useForm<FormData>({ resolver: zodResolver(schema) });
  // const onSubmit = (data: Fieldlues) => console.log(data);
  // return (
  //   <form onSubmit={handleSubmit(onSubmit)}>
  //     <div className="mb-3">
  //       <label htmlFor="name" className="form-label">
  //         Name
  //       </label>
  //       <input
  //         {...register("name", { required: true, minLength: 3 })}
  //         id="name"
  //         type="text"
  //         className="form-control"
  //       />
  //       {errors.name?.type === "required" && (
  //         <p className="text-danger">The name field is required.</p>
  //       )}
  //       {errors.name?.type === "minLength" && (
  //         <p className="text-danger">The name must be at least 3 characters.</p>
  //       )}
  //     </div>
  //     <div className="mb-3">
  //       <label htmlFor="age" className="form-label">
  //         Age
  //       </label>
  //       <input
  //         {...register("age", { valueAsNumber: true })}
  //         id="age"
  //         type="number"
  //         className="form-control"
  //       />
  //     </div>
  //     <button disabled={!isValid} className="btn btn-primary" type="submit">
  //       Submit
  //     </button>
  //   </form>
  // );

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="name" className="form-label">
          Name
        </label>
        <input ref={nameRef} id="name" type="text" className="form-control" />
      </div>
      <div className="mb-3">
        <label htmlFor="age" className="form-label">
          Age
        </label>
        <input ref={ageRef} id="age" type="number" className="form-control" />
      </div>
      <button className="btn btn-primary" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Form;
