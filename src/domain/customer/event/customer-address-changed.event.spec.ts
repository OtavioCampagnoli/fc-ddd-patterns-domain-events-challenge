import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLogWhenCustomerAddressChangedHandler from "./handler/send-console-log-when-customer-address-changed.handler";
import CustomerFactory from "../factory/customer.factory";
import Address from "../value-object/address";

describe("Customer domain events - address changed", () => {
    it("should call address changed handler when customer address is changed", () => {
        const eventDispatcher = new EventDispatcher();
        const handler = new SendConsoleLogWhenCustomerAddressChangedHandler();
        const spyHandler = jest.spyOn(handler, "handle");

        eventDispatcher.register("CustomerAddressChangedEvent", handler);

        const address = new Address("Old St", 1, "00000-000", "City");
        const customer = CustomerFactory.createWithAddress("John", address);

        const newAddress = new Address("New St", 2, "11111-111", "New City");
        customer.changeAddress(newAddress, eventDispatcher);

        expect(spyHandler).toHaveBeenCalled();
    });
});
