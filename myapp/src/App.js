import './App.css';

function App() {
  return (
    <Slider />
  );
}

function Slider() {
  return (
    <div class="owl-carousel owl-theme">
      <div class="item">
        <img src="https://picsum.photos/1110/400" alt='Slider img' />
      </div>
      <div class="item">
        <img src="https://picsum.photos/1110/400" alt='Slider img' />
      </div>
      <div class="item">
        <img src="https://picsum.photos/1110/400" alt='Slider img' />
      </div>
    </div>
  );
}

export default App;
