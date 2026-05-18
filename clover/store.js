// This module is a singleton.
// No matter how many MFEs import it, the browser's module cache
// ensures they all share this exact instance.
// That is the entire dependency deduplication requirement
// handled with no tooling, no advanced concepts...
// No webpack. No shared scope.

let count = 0;
const subscribers = [];

const notifySubscribers = () => {
  subscribers.forEach((subscriberFunction) => {
    subscriberFunction(count);
  });
};

const increment = () => {
  count = count + 1;
  notifySubscribers();
};

const decrement = () => {
  count = count - 1;
  notifySubscribers();
};

const getCount = () => {
  return count;
};

const subscribe = (subscriberFunction) => {
  subscribers.push(subscriberFunction);

  const unsubscribe = () => {
    const subscriberIndex = subscribers.indexOf(subscriberFunction);
    subscribers.splice(subscriberIndex, 1);
  };

  return unsubscribe;
};

// Logging the identity of the store is a solid way
// to verify that all MFEs are using the same instance.
// Expect all identity logs to have the same uid and label.
const identity = Object.freeze({
  label: "clover/store",
  uid: Math.random().toString(36).slice(2),
});

export const store = { increment, decrement, getCount, subscribe, identity };
