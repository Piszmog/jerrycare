import moment from 'moment';

export const formatTimetz = (input: string) => moment(input, 'HH:mm:ss.SSSSSSZ').format('h:mm:ss a');
