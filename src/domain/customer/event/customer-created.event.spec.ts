import EventDispatcher from "../../@shared/event/event-dispatcher";
import SendConsoleLogWhenCustomerIsCreatedHandler from "./handler/send-console-log-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "./handler/send-console-log-2-when-customer-is-created.handler";
import CustomerFactory from "../factory/customer.factory";

describe("Customer domain events - created", () => {
    it("should call both console log handlers when customer is created", () => {
        const eventDispatcher = new EventDispatcher();
        const handler1 = new SendConsoleLogWhenCustomerIsCreatedHandler();
        const handler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();

        const spyHandler1 = jest.spyOn(handler1, "handle");
        const spyHandler2 = jest.spyOn(handler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", handler1);
        eventDispatcher.register("CustomerCreatedEvent", handler2);

        CustomerFactory.create("John", eventDispatcher);

        expect(spyHandler1).toHaveBeenCalled();
        expect(spyHandler2).toHaveBeenCalled();
    });
});
