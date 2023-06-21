import Nigeria from '/asset/img/flags/nigeria.png'
import Senegal from '/asset/img/flags/senegal.png'
import Zambia from '/asset/img/flags/zambia.png'
import Ghana from '/asset/img/flags/ghana.png'
import Rwanda from '/asset/img/flags/rwanda.png'
import Kenya from '/asset/img/flags/kenya.png'
import Tanzania from '/asset/img/flags/tanzania.png'
import Cameroon from '/asset/img/flags/cameroon.png'
import Benin from '/asset/img/flags/benin.png'
import IvoryCoast from '/asset/img/flags/ivorycoast.png'

const renderFlag = (country?: string): string => {
  let flag: string
  switch (country) {
    case 'Nigeria':
      flag = Nigeria
      break
    case 'Senegal':
      flag = Senegal
      break
    case 'Zambia':
      flag = Zambia
      break
    case 'Ghana':
      flag = Ghana
      break
    case 'Rwanda':
      flag = Rwanda
      break
    case 'Kenya':
      flag = Kenya
      break
    case 'Tanzania':
      flag = Tanzania
      break
    case 'Cameroon':
      flag = Cameroon
      break
    case 'Benin':
      flag = Benin
      break
    case 'IvoryCoast':
      flag = IvoryCoast
      break
    default:
      flag = Nigeria
      break
  }

  return flag
}

export default renderFlag