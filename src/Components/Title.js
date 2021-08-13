export default function Title(props) {
  return (
    <div className="floatL" id="title-block">
      <h1>Ultimate Med's MusicDisk</h1>
      <p id="title-track">{props.title}</p>
    </div>
  );
}
