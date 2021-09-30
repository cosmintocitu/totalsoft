import { gql } from '@apollo/client'

const Fragments = {
  orice: gql`
    fragment conference on Conference {
      id
      name
      startDate
      endDate
    }
  `
}
export default Fragments
