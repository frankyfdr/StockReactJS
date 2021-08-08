import { useQuery, gql } from "@apollo/client";


export const GET_FINANCIAL = gql`
query ($sym: String!) {
    shareFinancial(sym: $sym)
    {
        sym
        code
        timestamp
        raw
        fmt
        periodType

    }

    historicPrice(sym:$sym,start:1496271600)
    {
        date
        open
        close
    }
}`;



export const GET_RETURN = gql`
query ($sym: String!) {
    profitReturn(sym: $sym)
    {
      return_4
      return_10
      timestamp
      periodType
    }
    historicPrice(sym: $sym ,start:1406138148){
        date
        open
        close
      }
}`;
