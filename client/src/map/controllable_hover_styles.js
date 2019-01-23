const K_SIZE = 20;

const greatPlaceStyle = {
  
  position: 'absolute',
  width: K_SIZE/5,
  height: K_SIZE/5,
  left: -K_SIZE / 10,
  top: -K_SIZE / 10,

  border: '3px solid #FF5722',
  borderRadius: K_SIZE,
  backgroundColor: 'rgb(255, 255, 255)',
  textAlign: 'center',
  color: '#FF5722',
  fontSize: 6,
  fontWeight: 'bold',
  padding: 3,
  cursor: 'pointer'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '4px solid rgb(224, 57, 6)',
  color: 'rgb(224, 57, 6)'
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};