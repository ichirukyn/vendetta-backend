import * as process from 'process';


export const reward = (total: number, base: number, enemy_lvl?: number, type: 'money' | 'exp' = 'exp') => {
  const mod = Number(process.env.GLOBAL_MOD);
  
  let coefficient = 1;
  let global_mod = 1;
  
  switch (type) {
    case 'exp':
      coefficient = Number(process.env.EXP_COEF);
      global_mod = Number(process.env.EXP_MOD);
      break;
    
    case 'money':
      coefficient = Number(process.env.MONEY_COEF);
      global_mod = Number(process.env.MONEY_MOD);
      break;
  }
  
  let reward = (mod * enemy_lvl || 1) ** coefficient;
  reward *= global_mod;
  reward += base;
  
  return Math.round(reward + total);
};
