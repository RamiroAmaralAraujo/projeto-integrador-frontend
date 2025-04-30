import { Page } from "@/components/Page";
import { ChatSidebar } from "./Components/ChatSidebar";
import { ChatArea } from "./Components/ChatArea";
import { Notificacao } from "@/components/Notificacao/Index";

export function ChatAtendimentos() {
  return (
    <Page.Root>
      <Page.Header>
        <Page.Title title="Ominichannel Chat" />
        <Notificacao />
      </Page.Header>

      <div className="w-full  h-[800px] flex justify-center items-center gap-4">
        
        <div className="h-full w-1/4 max-w-xs bg-white rounded-3xl shadow-lg">
          <ChatSidebar />
        </div>

    
        <div className="h-full w-3/4 flex flex-col bg-white rounded-3xl shadow-lg">
          <ChatArea />
        </div>
      </div>
    </Page.Root>
  );
}
