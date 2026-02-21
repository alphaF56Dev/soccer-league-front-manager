import { Component, Input } from '@angular/core';
import { Member } from '../../../shared/models/member.model';

@Component({
  selector: 'app-member-info',
  imports: [],
  templateUrl: './member-info.html',
  styleUrl: './member-info.css',
})
export class MemberInfo {
  @Input() member !: Member;
}
