import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {
  TITLE_BEST,
  TITLE_CHIPTUNE,
  TITLE_FIRST,
  TITLE_LOVE,
  TITLE_SECOND,
  TITLE_THIRD,
} from "../tools/const";

function ModuleButton(props) {
  const { first, second, third, love, best, chiptune, query, mod } = props;

  const [show, setShow] = useState(true);
  const [firstIcon, setFirstIcon] = useState(false);
  const [secondIcon, setSecondIcon] = useState(false);
  const [thirdIcon, setThirdIcon] = useState(false);
  const [bestIcon, setBestIcon] = useState(false);
  const [loveIcon, setLoveIcon] = useState(false);
  const [chiptuneIcon, setChiptuneIcon] = useState(false);
  let history = useHistory();

  function play(evt) {
    evt.preventDefault();
    const filename = evt.target.attributes.getNamedItem("data-filename").value;
    history.push(`/${filename}`);
  }

  function updateFilter(_props) {
    if (
      !_props.first &&
      !_props.second &&
      !_props.third &&
      !_props.best &&
      !_props.love &&
      !_props.chiptune
    ) {
      setShow(true);
    } else {
      setShow(false);
      if (firstIcon && _props.first) {
        setShow(true);
      }
      if (secondIcon && _props.second) {
        setShow(true);
      }
      if (thirdIcon && _props.third) {
        setShow(true);
      }
      if (loveIcon && _props.love) {
        setShow(true);
      }
      if (bestIcon && _props.best) {
        setShow(true);
      }
      if (chiptuneIcon && _props.chiptune) {
        setShow(true);
      }
    }
  }

  useEffect(() => {
    updateFilter({
      first,
      second,
      third,
      love,
      best,
      chiptune,
    });
    // eslint-disable-next-line
  }, [first, second, third, love, best, chiptune]);

  useEffect(() => {
    if (query && query.trim() !== "") {
      setShow(mod.name.toLowerCase().includes(query));
    } else {
      setShow(true);
    }
    updateFilter(props);
    // eslint-disable-next-line
  }, [query]);

  function updateMod(mod) {
    if (mod?.filters?.first) {
      setFirstIcon(true);
    }
    if (mod?.filters?.second) {
      setSecondIcon(true);
    }
    if (mod?.filters?.third) {
      setThirdIcon(true);
    }
    if (mod?.filters?.best) {
      setBestIcon(true);
    }
    if (mod?.filters?.love) {
      setLoveIcon(true);
    }
    if (mod?.filters?.chiptune) {
      setChiptuneIcon(true);
    }
  }
  // Display icons
  useEffect(() => {
    updateMod(mod);
  }, [mod]);

  return show ? (
    <li data-text={props.text}>
      <button data-filename={mod?.filename} onClick={play}>
        {mod?.filters?.first ? (
          <i title={TITLE_FIRST} className="icon first"></i>
        ) : (
          ""
        )}
        {mod?.filters?.second ? (
          <i title={TITLE_SECOND} className="icon second"></i>
        ) : (
          ""
        )}
        {mod?.filters?.third ? (
          <i title={TITLE_THIRD} className="icon third"></i>
        ) : (
          ""
        )}
        {mod?.filters?.best ? (
          <i title={TITLE_BEST} className="icon best"></i>
        ) : (
          ""
        )}
        {mod?.filters?.love ? (
          <i title={TITLE_LOVE} className="icon love"></i>
        ) : (
          ""
        )}
        {mod?.filters?.chiptune ? (
          <i title={TITLE_CHIPTUNE} className="icon chiptune"></i>
        ) : (
          ""
        )}
        {mod.name}
        <div className="floatR">{mod.size}</div>
      </button>
    </li>
  ) : (
    ""
  );
}

export default ModuleButton;
