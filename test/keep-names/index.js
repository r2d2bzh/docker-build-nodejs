import { Errors } from 'moleculer';
const { MoleculerServerError } = Errors;
const test = (config) => {
  if (!config) throw new MoleculerServerError();
  return {
    name: 'test',
    actions: {
      upsert: {
        handler: () => {},
      },
    },
  };
};
try {
  test();
} catch (error) {
  if (error.constructor.name !== 'MoleculerServerError') {
    throw error;
  }
}
