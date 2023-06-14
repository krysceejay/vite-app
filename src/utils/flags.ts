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

const renderFlag = (currency?: string): string => {
  let flag: string
  switch (currency) {
    case 'NGN':
      flag = Nigeria
      break
    case 'XOF':
      flag = Senegal
      break
    case 'ZMW':
      flag = Zambia
      break
    case 'GHS':
      flag = Ghana
      break
    case 'RWF':
      flag = Rwanda
      break
    case 'KES':
      flag = Kenya
      break
    case 'TZS':
      flag = Tanzania
      break
    case 'XAF':
      flag = Cameroon
      break
    case '(BJ)-XOF':
      flag = Benin
      break
    case '(CI)-XOF':
      flag = IvoryCoast
      break
    default:
      flag = Nigeria
      break
  }

  return flag
}

export default renderFlag