import { PrismaClient } from "@prisma/client"

import { CustomerData } from "../interfaces/CustomerData"
import { PaymentData } from "../interfaces/PaymentData"
import { SnackData } from "../interfaces/SnackData"

export default class CheckoutService {
  private prisma: PrismaClient

  // new CheckoutService()
  constructor() {
    this.prisma = new PrismaClient()
  }

  async process(
    cart: SnackData[],
    customer: CustomerData,
    payment: PaymentData
  ) {
    // TODO: "puxar" os dados de snacks do BD
    // in: [1,2,3,4]
    const snacks = await this.prisma.snack.findMany({
      where: {
        id: {
          in: cart.map((snack) => snack.id),
        },
      },
    })
    // console.log(`snacks`, snacks)

    // composição de coisas do banco de dados com o cart
    const snacksInCart = snacks.map<SnackData>((snack) => ({
      ...snack,
      price: Number(snack.price),
      quantity: cart.find((item) => item.id === snack.id)?.quantity!,
      subTotal:
        cart.find((item) => item.id === snack.id)?.quantity! *
        Number(snack.price),
    }))
    console.log(`snacksInCart`, snacksInCart)

    // TODO: registrar os dados do cliente no BD
    // TODO: criar uma order orderitem
    // TODO: processar o pagamento
  }

  // private async createCustomer(customer: CustomerData): Promise<Customer> {
  //   const customerCreated = await this.prisma.customer.upsert({
  //     where: { email: customer.email },
  //     update: customer,
  //     create: customer,
  //   })

  //   return customerCreated
  // }
}
