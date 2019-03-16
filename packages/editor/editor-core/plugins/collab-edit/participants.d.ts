import { Participant } from './types';
export interface ReadOnlyParticipants {
    get(sessionId: string): Participant | undefined;
    toArray(): ReadonlyArray<Participant>;
    eq(other: ReadOnlyParticipants): boolean;
}
export declare class Participants implements ReadOnlyParticipants {
    private participants;
    constructor(participants?: Map<string, Participant>);
    add(data: Participant[]): Participants;
    remove(sessionIds: string[]): Participants;
    update(sessionId: string, lastActive: number): Participants;
    toArray(): Participant[];
    get(sessionId: string): Participant | undefined;
    eq(other: Participants): boolean;
}
