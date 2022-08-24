// import React from "react";
// import StepProgressBar from "react-step-progress";
// // import the stylesheet
// import "react-step-progress/dist/index.css";
// import { Commande } from "../Commande";
// import { PaiementType } from "../paiementType/paiementType";
// import Finish from "../finishPaiement/finishPaiement";

// export default function App() {
//   const step1Content = <div><Commande/></div>;
//   const step2Content = <h1><PaiementType/></h1>;
//   const step3Content = <h1><Finish/></h1>;

//   // setup step validators, will be called before proceeding to the next step
//   function step2Validator() {
//     return true;
//   }

//   function step3Validator() {
//     // return a boolean
//   }
//   return (
//     <div className="App">
//       <StepProgressBar
//         startingStep={0}
//         steps={[
//           {
//             label: "Info de la livraison",
//             name: "Info de la livraison",
//             content: step1Content
//           },
//           {
//             label: "Achat",
//             name: "Image-Acquisition",
//             content: step2Content
//           },
//           {
//             label: "Paiement",
//             name: "Image Processing",
//             content: step3Content,
//             validator: step2Validator
//           },
//           {
//             label: "Finish",
//             name: "Finish",
//             content: step3Content
//           }
//         ]}
//       />
//     </div>
//   );
// }
