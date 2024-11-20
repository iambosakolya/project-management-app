// import React, {forwardRef} from "react";

// const Input = forwardRef(function Input({ label, textarea, ...props }, ref) {
//   const classes =
//     "w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600";
//   return (
//     <p className="flex flex-col gap-1 my-4">
//       <label className="text-sm font-bold uppercase text-stone-500">
//         {label}
//       </label>
//       {textarea ? (
//         <textarea ref={ref} className={classes} {...props} />
//       ) : (
//         <input ref={ref} className={classes} {...props} />
//       )}
//     </p>
//   );
// })

// export default Input;

import React from "react";

const Input = React.forwardRef(({ label, type = "text", textarea = false }, ref) => {
  const inputId = `input-${label.replace(/\s+/g, "").toLowerCase()}`;

  return (
    <div className="flex flex-col gap-1 my-4">
      <label htmlFor={inputId} className="text-sm font-bold uppercase text-stone-500">
        {label}
      </label>
      {textarea ? (
        <textarea
          id={inputId}
          ref={ref}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      ) : (
        <input
          id={inputId}
          ref={ref}
          type={type}
          className="w-full p-1 border-b-2 rounded-sm border-stone-300 bg-stone-200 text-stone-600 focus:outline-none focus:border-stone-600"
        />
      )}
    </div>
  );
});

export default Input;
