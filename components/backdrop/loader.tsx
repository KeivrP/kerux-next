// Loader.jsx
import './loader.css'; 

export default function Loader() {
  return (
    <div className="loader">
      <div className="square" id="sq1"></div>
      <div className="square" id="sq2"></div>
      <div className="square" id="sq3"></div> 
      <div className="square" id="sq4"></div>
      <div className="square" id="sq5"></div>
    </div>
  );
}