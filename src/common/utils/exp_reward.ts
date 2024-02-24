import * as process from 'process';


export const exp_reward = (total_exp: number, base_exp: number, enemy_lvl: number) => {
  const mod = 4;
  const coefficient = Number(process.env.EXP_COEF);
  const global_mod = Number(process.env.EXP_MOD);
  
  let reward = (mod * enemy_lvl) ** coefficient;
  reward *= global_mod;
  reward += base_exp;
  
  return Math.round(reward + total_exp);
};