const entityInstance = <T>(newable: new () => T): T => {
  return new newable();
};

export default entityInstance;
