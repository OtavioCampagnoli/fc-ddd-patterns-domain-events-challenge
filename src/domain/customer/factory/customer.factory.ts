import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../value-object/address";
import EventDispatcher from "../../@shared/event/event-dispatcher";
import CustomerCreatedEvent from "../event/customer-created.event";

export default class CustomerFactory {
  public static create(name: string, eventDispatcher?: EventDispatcher): Customer {
    const customer = new Customer(uuid(), name);
    const customerCreatedEvent = new CustomerCreatedEvent({
      id: customer.id,
      name: customer.name,
    });
    if (eventDispatcher) {
      eventDispatcher.notify(customerCreatedEvent);
    }
    return customer;
  }

  public static createWithAddress(name: string, address: Address): Customer {
    const customer = new Customer(uuid(), name);
    customer.changeAddress(address);
    return customer;
  }
}
