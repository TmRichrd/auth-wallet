import mitt from 'mitt';
import { userInfoProps } from '../api/types';

type Events = {
  login: userInfoProps;
  setAddress:any;
  logout:any;
  open:any;
  disconnect:any
};

const emitter = mitt<Events>();

export default emitter;
