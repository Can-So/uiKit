import { createContext } from 'react';
var initialContext = {};
var Experiment = createContext(initialContext);
export var ExperimentProvider = Experiment.Provider;
export var ExperimentConsumer = Experiment.Consumer;