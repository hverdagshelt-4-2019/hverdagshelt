const K_SIZE = 20;

const greatPlaceStyle = {
  
  position: 'absolute',
  width: K_SIZE,
  height: K_SIZE,
  left: -K_SIZE / 2,
  top: -K_SIZE / 2,

  border: '5px solid #FF5722',
  borderRadius: K_SIZE,
  backgroundColor: 'rgb(255, 255, 255)',
  textAlign: 'center',
  color: '#FF5722',
  fontSize: 16,
  fontWeight: 'bold',
  padding: 4,
  cursor: 'pointer'
};

const greatPlaceStyleHover = {
  ...greatPlaceStyle,
  border: '5px solid #1976D2',
  color: '#1976D2'
};

export {greatPlaceStyle, greatPlaceStyleHover, K_SIZE};