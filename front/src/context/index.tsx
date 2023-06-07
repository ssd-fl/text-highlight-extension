import React from 'react';
import { ActionContextType } from '../@types/action';

const ActionContext = React.createContext<ActionContextType | null>(null);
export const ActionProvider = ActionContext.Provider;
export default ActionContext;
