
import { GetSymInfo } from "./GetSym";

 export const Load = async (symUser,nodejs, setSymInfo) => 
{
  if (symUser !== "") 
  {
     await GetSymInfo(symUser, nodejs).then((list) =>
    {
      setSymInfo(list);
      //setRendimento(list[0]) + setSymList(list[1]);
    });
  } 
}   
