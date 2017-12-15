import { Participant } from './types';

export interface ReadOnlyParticipants {
  get(sessionId: string): Participant | undefined;
  toArray(): ReadonlyArray<Participant>;
}

export class Participants implements ReadOnlyParticipants {
  private participants: Map<string, Participant>;

  constructor(
    participants: Map<string, Participant> = new Map<string, Participant>(),
  ) {
    this.participants = participants;
  }

  add(data: Participant[]) {
    const newSet = new Map<string, Participant>(this.participants);
    data.forEach(participant => {
      newSet.set(participant.sessionId, participant);
    });
    return new Participants(newSet);
  }

  remove(sessionIds: string[]) {
    const newSet = new Map<string, Participant>(this.participants);
    sessionIds.forEach(sessionId => {
      newSet.delete(sessionId);
    });

    return new Participants(newSet);
  }

  update(sessionId: string, lastActive: number) {
    const newSet = new Map<string, Participant>(this.participants);
    const data = newSet.get(sessionId);
    if (!data) {
      return this;
    }

    newSet.set(sessionId, {
      ...data,
      lastActive,
    });

    return new Participants(newSet);
  }

  toArray() {
    return Array.from(this.participants.values());
  }

  get(sessionId: string) {
    return this.participants.get(sessionId);
  }
}
