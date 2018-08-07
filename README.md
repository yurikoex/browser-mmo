# Design

This experiment is a p2p massive multiplayer universe simulation built on blockchain techniques.

This employs two primary techniques, one being a quadtree, the second being a blockchain, which this this project will call a leafchain.

NOTE: avoiding calling quadtree node's node's to avoid confusion about node.js

## Laws of a Leafchain

Everytime a user places an item in 3d space, it is placed in the leafchain. 

In a quadtree, every leaf can have 4 children leaves. Continueing until a minimum leaf size.

The root leaf is the seed of leafchain. There can be any number of leafchains.

A game world might decide to have many leafchains, one, thousands, public, private.

A leafchain can represent any volume of space.

When a leaf is created, it creates another seed signed by the leaf. This chain is called revision chain(rev-chain).

The rev-chain contains a block for every revision of the ledger.

When a rev-chain block is created, it creates yet another seed signed by the rev-chain. This chain is called data-chain.

Data-chain records all the CRUD operations for that leaf. 

Data-chain has a max record size and max object storage size.

If data-chain max record size it will cause a squash action and flatten the history of changes and create a new re-chain block.

If data-chain max object storage size is reached it will cause a squash action and generate the 4 child leaves until minimum leaf size is reached.
