import net.dv8tion.jda.api.*
import net.dv8tion.jda.api.events.message.guild.GuildMessageReceivedEvent
import net.dv8tion.jda.api.hooks.ListenerAdapter
import net.dv8tion.jda.api.requests.GatewayIntent

class BotClient : ListenerAdapter(){
    private lateinit var jda: JDA
    
    fun main(token: String) {
        jda = JDABuilder.createDefault(token,
            GatewayIntent.GUILD_MESSAGES)
            .addEventListeners(this)
            .build()
    }
    
    override fun onGuildMessageReceived(event : GuildMessageReceivedEvent) {
        if(event.message.contentDisplay == "!ping"){
            event.message.reply("pong!").queue()
        }
    }
}

fun main() {
    val token = System.getenv("DISCORD_BOT_TOKEN")
    val bot = BotClient()
    bot.main(token)
}