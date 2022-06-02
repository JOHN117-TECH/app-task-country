import { v4 as uuidv4 } from 'uuid';
const generateId = () => {
  const id = uuidv4();
  return id;
};

export default generateId;
