import './App.css';

function App() {
  return (
    <Slider />
  );
}

function Slider() {
  return (
    <div class='container'>
      <div class="owl-carousel owl-theme">
        <SliderImage
          image_url='https://picsum.photos/1110/400'
          title='Test Title'
          description='Event description'
          button_text='Read More'
          button_link='/' />
      </div>
    </div>
  );
}

function SliderImage(args) {
  let image_url = ('image_url' in args) ? args.image_url : null;
  let title = ('title' in args) ? args.title : null;
  let image_alt = (title == null) ? 'slider image' : title;
  let description = ('description' in args) ? args.description : null;
  let button_text = ('button_text' in args) ? args.button_text : null;
  let button_link = ('button_link' in args) ? args.button_link : null;
  let button_html = ''

  if (image_url == null)
    return;

  if (button_link == null || button_text == null) {
    button_link = null;
    button_text = null;
  }else{
    button_html = (<a href={button_link} class='slider-btn'>{button_text}</a>)
  }

  if (description != null) {
    description = (<p>{description}</p>)
  }

  return (
    <div class='item'>
      <div class='slider-item'>
        <img src={image_url} alt={image_alt} />

        <div class='row'>
          <div class='col-md-6 px-0 v-middle'>
            <div>
              <h2>{title}</h2>
              {description}
              {button_html}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App;
