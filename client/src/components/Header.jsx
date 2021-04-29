import HeaderSvg from '../img/header1.svg';
const Header = () => {
  return (
    <>
      <img
        src={HeaderSvg}
        alt=""
        maxheight="120px"
        width="40%"
        style={{ paddingLeft: '27vw', marginBottom: '1vh', marginTop: '1vh' }}
      />
      <br />
    </>
  );
};

export default Header;
